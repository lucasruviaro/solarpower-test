import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IndicacaoForm from '../components/IndicacaoForm';

const NovaIndicacaoScreen = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [usuarioIndicador, setUsuarioIndicador] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(storedToken => {
        if (storedToken) {
          setToken(storedToken);

          fetch('http://localhost:8080/api/indicacao/usuario-sessao', {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          })
          .then(response => response.json())
          .then(usuario => {
            setUsuarioIndicador(usuario.id);
          })
          .catch(error => console.error("Erro ao buscar usuário da sessão:", error));

          fetch('http://localhost:8080/api/indicacao/buscarProdutos', {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          })
          .then(response => response.json())
          .then(data => setProdutos(data))
          .catch(error => console.error("Erro ao buscar produtos:", error));
        } else {
          console.log("Token não encontrado. Redirecionar para o login.");
        }
      })
      .catch(error => console.error("Erro ao obter token:", error));
  }, []);

  const handleSalvar = (indicacao) => {
    fetch('http://localhost:8080/api/indicacoes/salvarIndicacao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        usuarioIndicador: usuarioIndicador,
        nomeIndicado: nomeIndicado,
        emailIndicado: emailIndicado,
        telefoneIndicado: telefoneIndicado,
        produtoIndicado: produtoIndicado,
      })
    })
    .then(response => {
      if (response.ok) {
        alert('Indicação salva com sucesso!');
      } else {
        response.json().then(errorData => {
          alert(`Erro ao salvar indicação: ${JSON.stringify(errorData)}`);
        }).catch(() => {
          alert('Erro ao salvar indicação.');
        });
      }
    })
    .catch(error => console.error("Erro na requisição:", error));
  };

  return (
    <View style={styles.container}>
      {usuarioIndicador && (
        <Text>Usuário Indicador: {usuarioIndicador}</Text>
      )}

      <IndicacaoForm
        usuarios={usuarios}
        produtos={produtos}
        onSalvar={handleSalvar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default NovaIndicacaoScreen;
