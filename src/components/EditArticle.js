import { getTags, updateArticle } from "../services/Api";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UpdateForm = ({ slug }) => {
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });

  const { data } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  useEffect(() => {
    setTags(data.tags.map((tag) => ({ value: tag, label: tag })));
  }, [data.tags]);

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
      navigate("/");
    } catch (error) {
      setError("Error");
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
