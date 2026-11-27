/* Derry Archive — configuração central
   Preencha somente o que estiver entre aspas. Deixe vazio o que ainda não existir.
   Vazio significa desligado: o site não inventa token, tag nem URL. */
window.DERRY = {
  siteUrl: 'https://derryarchive.site',

  analytics: {
    /* Token do Cloudflare Web Analytics.
       Painel Cloudflare → Analytics → Web Analytics → o site → JS snippet → token.
       Vazio = o beacon não é carregado. */
    cloudflareWebAnalyticsToken: '',

    /* ID de medição do GA4, no formato G-XXXXXXXXXX.
       Vazio = o script do Google não é carregado. */
    ga4MeasurementId: ''
  },

  affiliates: {
    /* Tag de Associados da Amazon.com.br. Exemplo de formato: seunome-20
       Vazio = o botão abre a busca da Amazon sem tag de comissão. */
    amazonBrTag: '',

    /* URL de afiliado da Shopee. Coloque {q} onde o título da busca deve entrar.
       Exemplo de formato: https://s.shopee.com.br/SEU_LINK?keyword={q}
       Vazio = o botão abre a busca pública da Shopee. */
    shopeeAffiliateUrl: ''
  },

  newsletter: {
    /* URL que recebe o POST do formulário semanal «Arquivos do Terror».
       Aceita Formspree, Brevo, Buttondown ou o endereço formResponse de um Google Form.
       O corpo é application/x-www-form-urlencoded com o campo de e-mail abaixo.
       Vazio = o formulário não envia e pede para seguir o Instagram. */
    formAction: '',

    /* Nome do campo de e-mail que a URL acima espera. Padrão: email.
       Em Google Forms, troque pelo entry.123456789 da pergunta de e-mail. */
    emailField: 'email'
  },

  googleForms: {
    /* Caixa de Pesadelos. Crie um Google Form com duas perguntas
       (resposta longa e resposta curta). Em ⋮ → Obter link pré-preenchido,
       escreva MENSAGEM na primeira e LIVRO na segunda, gere o link e cole aqui.
       Vazio = a caixa não envia e orienta a mandar DM no Instagram. */
    prefillUrl: ''
  },

  instagram: {
    /* URL do feed JSON da conta @derryarchive.site (Behold.so ou compatível).
       Exemplo de formato: https://feeds.behold.so/SEU_ID
       Vazio = a faixa de posts na enciclopédia fica oculta. */
    feedUrl: ''
  }
};
