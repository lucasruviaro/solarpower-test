import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

const IndicacaoForm = ({ usuarios, produtos, onSalvar }) => {
  const [nomeIndicado, setNomeIndicado] = useState('');
  const [emailIndicado, setEmailIndicado] = useState('');
  const [telefoneIndicado, setTelefoneIndicado] = useState('');
  const [produtoIndicado, setProdutoIndicado] = useState('');

  const handleSubmit = () => {
    onSalvar({
      nomeIndicado,
      emailIndicado,
      telefoneIndicado,
      produtoIndicado,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Nome do Usuário Indicado:</Text>
      <TextInput
        style={styles.input}
        value={nomeIndicado}
        onChangeText={setNomeIndicado}
      />

      <Text>Email do Usuário Indicado:</Text>
      <TextInput
        style={styles.input}
        value={emailIndicado}
        onChangeText={setEmailIndicado}
        keyboardType="email-address"
      />

      <Text>Telefone do Usuário Indicado:</Text>
      <TextInput
        style={styles.input}
        value={telefoneIndicado}
        onChangeText={setTelefoneIndicado}
        keyboardType="phone-pad"
      />

      <Text>Produto Indicado:</Text>
      <Picker
        selectedValue={produtoIndicado}
        style={styles.picker}
        onValueChange={(itemValue) => setProdutoIndicado(itemValue)}
      >
        {produtos.map(produto => (
          <Picker.Item key={produto.id} label={produto.nome} value={produto.id} />
        ))}
      </Picker>

      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default IndicacaoForm;
