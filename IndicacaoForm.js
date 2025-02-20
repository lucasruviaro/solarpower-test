import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

const IndicacaoForm = ({ usuarios, produtos, onSalvar }) => {
  const [usuarioIndicado, setUsuarioIndicado] = useState('');
  const [produtoIndicado, setProdutoIndicado] = useState('');

  const handleSubmit = () => {
    onSalvar({
      usuarioIndicado,
      produtoIndicado,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Usuário Indicado:</Text>
      <TextInput
        style={styles.input}
        value={usuarioIndicado}
        onChangeText={setUsuarioIndicado}
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
