import { Link } from "react-router-dom";

export default function Home() {
    const posts = JSON.parse(localStorage.getItem("posts"));
    return (
        <div className="container mx-auto my-5">
            <h1 className="h1 mb-4 text-center">Meeting Rooms</h1>
            {posts
                ? posts
                      .filter(
                          (p) =>
                              p.status === "publish" || p.status === "private"
                      )
                      .map((post) => {
                          return (
                              <div key={post.id} className="card mb-2">
                                  <div className="card-body">
                                      <h5 className="card-title">
                                          {post.title}
                                      </h5>
                                      <div className="text-end">
                                          <Link
                                              to={`/room/${post.id}`}
                                              className="btn btn-primary btn-sm"
                                          >
                                              Read More
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                : null}

            <div className="mt-4 d-flex justify-content-center gap-3">
                <Link to="/main" className="btn btn-link btn-sm">
                    Dashboard
                </Link>
                <Link to="/booking_history" className="btn btn-link btn-sm">
                    Booking Room History
                </Link>
            </div>
        </div>
    );
}
