import CreateForm from "../components/CreateArticle";
import UpdateForm from "../components/EditArticle";
import { useParams } from "react-router-dom";
const Editor = () => {
  const { slug } = useParams();
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {slug ? <UpdateForm slug={slug} /> : <CreateForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
