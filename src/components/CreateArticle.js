import { getTags, createArticle } from "../services/Api";
import { useState, useEffect } from "react";
import Select from "react-select";

const CreateForm = () => {
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [""],
  });

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTags();
        setTags(response.tags.map((tag) => ({ value: tag, label: tag })));
      } catch (error) {
        setError("Failed to fetch tags");
      }
    };

    fetchTags();
  }, []);

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

  const handlePublishSubmit = async (e) => {
    e.preventDefault();
    try {
      await createArticle(articleData);
      setError("Successful!");
    } catch (error) {
      setError("Failed!");
    }
  };
  return (
    <form onSubmit={handlePublishSubmit}>
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
          Publish Article
        </button>
      </fieldset>
    </form>
  );
};

export default CreateForm;
