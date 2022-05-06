import { ReactElement } from "react";
import CommentItem from "../../components/common/comment-item";
import Layout from "../../components/layout";
import CommentsForm from "../../components/pages/recommendations/forms/Comments";
import { v4 as gxUUID} from 'uuid';

const Recommendations = () => {
    return (
        <>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card mb-3">
                        <CommentsForm />
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="row">
                        {
                            [1, 2].map(item => (
                                <>
                                    <div
                                        key={gxUUID()}
                                        className="mb-2">
                                        < CommentItem />
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
Recommendations.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout >
    )
}

export default Recommendations;
