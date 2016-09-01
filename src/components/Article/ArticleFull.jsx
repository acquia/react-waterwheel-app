const ArticleFull = ({ article }) => (
  <article key={article.id} className="full">
    <header>
      <h1 className="title">{article.attributes.title}</h1>
    </header>
    <section>
      <div dangerouslySetInnerHTML={{ __html: article.attributes.body.value }} />
    </section>

  </article>
);
