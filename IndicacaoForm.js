import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import UsuarioSelector from './UsuarioSelector';
import ProdutoSelector from './ProdutoSelector';

const IndicacaoForm = ({ usuarios, produtos, onSalvar }) => {
  const [usuarioIndicado, setUsuarioIndicado] = useState('');

  const handleSubmit = () => {
    onSalvar({
      usuarioIndicador: usuarioIndicadorSelecionado,
      usuarioIndicado,
      produtoIndicado: produtoIndicadoSelecionado,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Usuário Indicador:</Text>
      <UsuarioSelector usuarios={usuarios} onSelect={setUsuarioIndicadorSelecionado} />

      <Text>Usuário Indicado:</Text>
      <TextInput
        style={styles.input}
        value={usuarioIndicado}
        onChangeText={setUsuarioIndicado}
      />

      <Text>Produto Indicado:</Text>
      <ProdutoSelector produtos={produtos} onSelect={setProdutoIndicadoSelecionado} />

      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default IndicacaoForm;
