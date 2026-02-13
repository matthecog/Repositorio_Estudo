using System;
using System.Text.Json;
using System.Threading.Tasks;
using Azure.Messaging.ServiceBus;
using Microsoft.Azure.Functions.Worker;
//using Microsoft.Azure.ServiceBus;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;


namespace fnSBRentProcess
{
    public class ProcessaLocacao
    {
        private readonly ILogger<ProcessaLocacao> _logger;
        private readonly IConfiguration _configuration;
        public ProcessaLocacao(ILogger<ProcessaLocacao> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [Function(nameof(ProcessaLocacao))]
        public async Task Run(
            [ServiceBusTrigger("fila-locacao-auto", Connection = "ServiceBusConnection")]
            ServiceBusReceivedMessage message,
            ServiceBusMessageActions messageActions)
        {
            
            _logger.LogInformation("Message ID: {id}", message.MessageId);
            var body = message.Body.ToString();
            _logger.LogInformation("Message Body: {body}", body);
            _logger.LogInformation("Message Content-Type: {contentType}", message.ContentType);

            RentModel rentModel = null;
            try
            {
                rentModel = JsonSerializer.Deserialize<RentModel>(body, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (rentModel is null)
                {
                    _logger.LogWarning("Mensagem mal formatada.");
                    await messageActions.DeadLetterMessageAsync(message, null, "Mensagem mal formatada.");
                    return;
                }

                var connectionString = _configuration.GetConnectionString("SqlConnectionString");
                using var connection = new SqlConnection(connectionString);
                await connection.OpenAsync();

                var command =
                    new SqlCommand(@"INSERT INTO Locacao (Nome, Email, Modelo, Ano, TempoAluguel, Data)
                            VALUES (@nome, @email, @modelo, @ano, @tempo, @data)", connection);

                command.Parameters.AddWithValue("@nome", rentModel.nome);
                command.Parameters.AddWithValue("@email", rentModel.email);
                command.Parameters.AddWithValue("@modelo", rentModel.modelo);
                command.Parameters.AddWithValue("@ano", rentModel.ano);
                command.Parameters.AddWithValue("@tempo", rentModel.tempoAluguel);
                command.Parameters.AddWithValue("@data", rentModel.data);

                var serviceBusConnection = _configuration.GetSection("ServiceBusConnection").Value.ToString();
                var serviceBusQueue = _configuration.GetSection("ServiceBusQueue").Value.ToString();
                sendMessageToPay(serviceBusConnection, serviceBusQueue, rentModel);

                var rowsAffected = await command.ExecuteNonQueryAsync();

                // Complete the message
                await messageActions.CompleteMessageAsync(message);
                connection.Close();

            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Erro ao processar  mensagem: {message}", message.MessageId);
                await messageActions.DeadLetterMessageAsync(message, null, $"Erro ao processar  mensagem: {ex.Message}");
                return;
            }
        }

        private void sendMessageToPay(string serviceBusConnection, string serviceBusQueue, RentModel rentModel)
        {
            ServiceBusClient serviceBusClient = new ServiceBusClient(serviceBusConnection);
            ServiceBusSender serviceBusSender = serviceBusClient.CreateSender(serviceBusQueue);
            ServiceBusMessage message = new ServiceBusMessage(JsonSerializer.Serialize(rentModel));
            message.ContentType = "application/json";
            message.ApplicationProperties.Add("Tipo", "Pagametno");
            message.ApplicationProperties.Add("Nome", rentModel.nome);
            message.ApplicationProperties.Add("Email", rentModel.email);
            message.ApplicationProperties.Add("Modelo", rentModel.modelo);
            message.ApplicationProperties.Add("Ano", rentModel.ano);
            message.ApplicationProperties.Add("TempoAluguel", rentModel.tempoAluguel);
            message.ApplicationProperties.Add("Data", rentModel.data);

            serviceBusSender.SendMessageAsync(message).Wait();
            serviceBusSender.DisposeAsync();
        }
    }

}