import streamlit as st
from azure.storage.blob import BlobServiceClient
import os
import pymssql
import uuid
import json
from dotenv import load_dotenv
load_dotenv()

blobConnectionString = os.getenv('BLOB_CONNECTION_STRING')
blobContainerName = os.getenv('BLOB_CONTAINER_NAME')
blobaccountName = os.getenv('BLOB_ACCOUNT_NAME')

SQL_SERVER = os.getenv('SQL_SERVER')
SQL_DATABASE = os.getenv ('SQL_DATABASE')
SQL_USER = os.getenv ('SQL_USER')
SQL_PASSWORD = os.getenv ('SQL_PASSWORD')

st.title('Cadastro de Produtos')

#Formulario de cadastro de pordutos
product_name = st.text_input('Nome do Produto')
product_price = st.number_input('Preço do Produto', min_value=0.0, format='%.2f')
product_description = st.text_area ('Descrição do Produto')
product_image = st.file_uploader('Imagem do Produto', type=['jpg', 'png', 'jpeg'])

#Salva imagem no blob storage
def upload_blob(file):
    try:
        blob_service_client = BlobServiceClient.from_connection_string(blobConnectionString)
        container_client = blob_service_client.get_container_client(blobContainerName)
        blob_name = str(uuid.uuid4()) + file.name
        blob_client = container_client.get_blob_client(blob_name)
        blob_client.upload_blob(file.read(), overwrite=True)
        imagem_url = f"https://{blobaccountName}.blob.core.windows.net/{blobContainerName}/{blob_name}"
        return imagem_url
    except Exception as e:
        st.error(f"Erro ao enviar imagem: {e}")
        return None

def insert_product(product_name, product_price, product_description, product_image):
    try:
        imagem_url = None
        if product_image is not None:
            imagem_url = upload_blob(product_image)
            conn = pymssql.connect(
            server=SQL_SERVER,
            user=SQL_USER,
            password=SQL_PASSWORD,
            database=SQL_DATABASE
        )
        cursor = conn.cursor()

        insert_sql = """
        INSERT INTO Produtos (nome, preco, descricao, imagem_url)
        VALUES (%s, %s, %s, %s)
        """
        cursor.execute(insert_sql, (
            product_name,
            product_price,
            product_description,
            imagem_url
        ))

        conn.commit()
        conn.close()
        return True

    except Exception as e:
        st.error(f'Erro ao inserir produto: {e}')
        return False


def list_products():
    try:
        conn = pymssql.connect(server=SQL_SERVER, user=SQL_USER, password=SQL_PASSWORD, database=SQL_DATABASE)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Produtos")
        rows = cursor.fetchall()
        conn.close()
        return rows
    except Exception as e:
        st.error(f'Erro ao listar produtos: {e}')
        return []

def list_produtos_screen():
    products = list_products()
    print(products)
    if products:
        # Define o número de cards por linha
        cards_por_linha = 3
        #Cria as colunas iniciais
        cols = st.columns(cards_por_linha)
        for i, product in enumerate(products):
            col = cols[i % cards_por_linha]
            with col:
                st.markdown(f"### {product[1]}")
                st.write(f"**Descrição:** {product[2]}")
                st.write(f"**Preço:** R$ {product[3]:.2f}")
                if product[4]:
                    html_img = f'<img src="{product[4]}" width="200" height="200" alt="Imagem do produto">'
                    st.markdown(html_img, unsafe_allow_html=True)
                st.markdown("---")
            # A cada 'cards_por_linha' produtos, se ainda houver produtos, cria novas colunas
            if (i + 1) % cards_por_linha == 0 and (i + 1) < len(products):
                cols = st.columns(cards_por_linha)
    else:
        st.info("Nenhum produto encontrado.")

if st.button('Salvar Produto'):
    insert_product(product_name, product_price, product_description, product_image)
    return_message = 'Produto salvo com sucesso'
    list_produtos_screen()

st.header('Produtos Cadastrados')

if st.button('Listar Produtos'):
    list_produtos_screen()
    return_message = 'Produtos listados com sucesso'