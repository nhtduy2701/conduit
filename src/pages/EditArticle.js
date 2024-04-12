import UpdateArticleForm from "../components/UpdateArticleForm";
const EditArticle = ({ slug }) => {
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <UpdateArticleForm slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
