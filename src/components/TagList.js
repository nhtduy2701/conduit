import { useState, useEffect } from "react";
import { getTags } from "../services/Api";
import { Link } from "react-router-dom";

const TagList = ({ setCurrentTag, setCurrentPage, currentPage }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTags();
        setTags(response.tags);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tags:", error);
        setLoading(false);
      }
    };

    fetchTags();
  }, [currentPage]);

  const handleTagClick = (tag) => {
    setCurrentTag(tag);
    setCurrentPage(1);
  };

  if (loading)
    return (
      <div className="tag-list">
        <p>Loading Tags...</p>
      </div>
    );

  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <Link
          key={tag}
          className="tag-pill tag-default"
          onClick={() => handleTagClick(tag)}
          to="/"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default TagList;
