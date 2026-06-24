const SENHA = "120210";

const autenticacaoMiddleware = (req, res, next) => {
    const senha = req.headers.senha;
  
    if (senha !== SENHA) {
      return res.status(403).json({
        mensagem: "Acesso negado"
      });
    }
  
    next();
  };

  module.exports = {
    autenticacaoMiddleware
  }