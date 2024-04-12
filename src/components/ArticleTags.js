const ArticleTags = ({ article }) => {
  return (
    <ul className="tag-list">
      {article.tagList.map((tag) => (
        <li key={tag} className="tag-default tag-pill tag-outline">
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default ArticleTags;
