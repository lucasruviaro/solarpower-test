@RestController
@RequestMapping("/api/indicacoes")
public class IndicacaoController {

    @Autowired
    private IndicacaoService indicacaoService;

    @GetMapping("/usuario-sessao")
    public Usuario getUsuarioSessao(Principal principal) {
        String username = principal.getUsername();
        return usuarioRepository.findByUsername(username);
    }

    @GetMapping("/produtos")
    public List<Produto> buscarProdutos() {
        return produtoService.buscarProdutos();
    }

    @PostMapping
    public ResponseEntity<?> salvarIndicacao(@RequestBody IndicacaoDTO indicacaoDTO) {
        try {
            Indicacao indicacao = new Indicacao();
            //no construtor do Indicacao já poderia ser setado o status de pendente para toda indicação nova
            indicacao.setStatus(Status.PENDENTE)
            indicacaoService.salvarIndicacao(indicacao);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao salvar indicação.");
        }
    }
}
