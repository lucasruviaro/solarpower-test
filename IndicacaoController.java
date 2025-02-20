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

    @GetMapping("/usuarios")
    public Usuario getUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> salvarIndicacao(@RequestBody IndicacaoDTO indicacaoDTO) {
        try {
            Indicacao indicacao = new Indicacao();
            indicacaoService.salvarIndicacao(indicacao);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao salvar indicação.");
        }
    }
}
