import { useQuery } from "@tanstack/react-query";
import { getTags } from "../services/Api";
import { Link, useNavigate } from "react-router-dom";

const TagList = ({ setCurrentTag, setCurrentPage }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  const handleTagClick = (tag) => {
    setCurrentTag(tag);
    setCurrentPage(1);
  };

  if (isLoading)
    return (
      <div className="tag-list">
        <p>Loading Tags...</p>
      </div>
    );

  if (isError) {
    navigate("*");
    return null;
  }

  if (!data.tags || data.tags.length === 0)
    return (
      <div className="article-preview">
        <p>No tags are here... yet.</p>
      </div>
    );

  return (
    <div className="tag-list">
      {data.tags.map((tag) => (
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
