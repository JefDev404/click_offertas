export default function ProductGrid({ produtos = [] }) {
  return (
    <div className="product-container">
      {produtos.map((produto) => (
        <div className="product-card" key={produto.id}>
          <img src={produto.imagem} alt={produto.nome} className="product-img" />
          <h3 className="product-title">{produto.nome}</h3>
          <p className="product-price">{produto.preco}</p>
          <a href={produto.link} className="product-btn">Comprar</a>
        </div>
      ))}
    </div>
  );
}
