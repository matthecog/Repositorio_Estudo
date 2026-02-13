using Azure.Messaging.ServiceBus;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.CosmosDB;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Text.Json;
using System.Threading.Tasks;
namespace fnPaymant
{
    public class Paymant
    {
        private readonly ILogger<Paymant> _logger;
        private readonly IConfiguration _configuration;
        private readonly string[] StatusList = { "Aprovado", "Reprovado", "Em análise" };
        private readonly Random random = new Random();
        public Paymant(ILogger<Paymant> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [Function(nameof(Paymant))]
        [CosmosDBOutput("%CosmosDb%", "%CosmosContainer%", Connection = "CosmosDBConnection", CreateIfNotExists = true)]
        public async Task<object?> Run(
            [ServiceBusTrigger("payment-queue", Connection = "ServiceBusConnection")]
            ServiceBusReceivedMessage message,
            ServiceBusMessageActions messageActions)
        {
            _logger.LogInformation("Message ID: {id}", message.MessageId);
            _logger.LogInformation("Message Body: {body}", message.Body);
            _logger.LogInformation("Message Content-Type: {contentType}", message.ContentType);

            PaymantModel paymant = null;
            try
            {
                paymant = JsonSerializer.Deserialize<PaymantModel>(message.Body.ToString(), new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (paymant == null)
                {
                    await messageActions.DeadLetterMessageAsync(message, null, "Mensagem mal formatada");
                }
                int index = random.Next(StatusList.Length);
                string status = StatusList[index];
                paymant.status = status;

                if (status == "Aprovado")
                {
                    paymant.dataAprovacao = DateTime.UtcNow;
                    await sendToNotificationQueue(paymant);
                }

                return paymant;

            }
            catch (Exception ex)
            {
                await messageActions.DeadLetterMessageAsync(message, null, $"Erro: {ex.Message}");
                return null;
            }

            finally
            {
                await messageActions.CompleteMessageAsync(message);
            }
        }

        private async Task sendToNotificationQueue(PaymantModel paymant)
        {
            var connection = _configuration.GetSection("ServiceBusConnection").Value.ToString();
            var queue = _configuration.GetSection("NotificationQueue").Value.ToString();

            // Enviar mensagem para a fila de notificação
            var serviceBusClient = new ServiceBusClient(connection);
            var sender = serviceBusClient.CreateSender(queue);
            var message = new ServiceBusMessage(JsonSerializer.Serialize(paymant));
            message.ApplicationProperties["type"] = "notification";
            message.ApplicationProperties["message"] = "Pagamento aprovado com sucesso";
            message.ApplicationProperties["timestamp"] = DateTime.UtcNow.ToString("o");
            await sender.SendMessageAsync(message);
        }
    }
}