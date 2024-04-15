import { getTags, updateArticle, getArticle } from "../services/Api";
import { useState, useEffect } from "react";
import Select from "react-select";

const UpdateForm = ({ slug }) => {
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all([getTags(), getArticle(slug)]);
        const tagsResponse = response[0];
        const articleResponse = response[1];

        setTags(tagsResponse.tags.map((tag) => ({ value: tag, label: tag })));
        setArticleData({
          title: articleResponse.article.title,
          description: articleResponse.article.description,
          body: articleResponse.article.body,
          tagList: articleResponse.article.tagList,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, [slug]);

  const handleChange = (e) => {
    setArticleData({
      ...articleData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTagChange = (selectedTags) => {
    setArticleData({
      ...articleData,
      tagList: selectedTags.map((tag) => tag.value),
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateArticle(slug, articleData);
      setError("Update successful!");
    } catch (error) {
      setError("Failed to update article!");
    }
  };

  return (
    <form onSubmit={handleUpdateSubmit}>
      <fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Article Title"
            value={articleData.title}
            onChange={handleChange}
            name="title"
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="What's this article about?"
            value={articleData.description}
            onChange={handleChange}
            name="description"
          />
        </fieldset>
        <fieldset className="form-group">
          <textarea
            className="form-control"
            rows={8}
            placeholder="Write your article (in markdown)"
            value={articleData.body}
            onChange={handleChange}
            name="body"
          />
        </fieldset>
        <fieldset className="form-group">
          <Select
            isMulti
            options={tags}
            placeholder="Enter tags"
            onChange={handleTagChange}
            value={tags.filter((tag) =>
              articleData.tagList.includes(tag.value)
            )}
          />
        </fieldset>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
          Update Article
        </button>
      </fieldset>
    </form>
  );
};

export default UpdateForm;
