enviando imagem para o ACR 

az login

az acr login --name acrdevb07

docker tag bff-rent-car-local acrdevb07.azurecr.io/bff-rent-car-local:v1

docker push acrdevb07.azurecr.io/bff-rent-car-local:v1

az containerapp env create --name bff-rent-car-local --resource-group LAB007 --location eastus

az containerapp create --name bff-rent-car-local --resource-group LAB007 --environment managedEnvironment-LAB007-a296 --image acrdevb07.azurecr.io/bff-rent-car-local:v1 --target-port 3001 --ingress 'external' --registry-server acrdevb07.azurecr.io
