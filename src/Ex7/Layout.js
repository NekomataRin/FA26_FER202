import Navigation from "./Navigation_v2";
export default function Layout() {
    return (
        <div>
            <Navigation>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" />
                    <button className="btn btn-outline-primary" type="submit">Search</button>
                </form>
            </Navigation>

            {/* BANNER */}
            <img src="https://placehold.co/1920x530" className="w-100" alt="Banner" />

            {/* NEW PRODUCT */}
            <div className="container my-5">
                <h2>NEW PRODUCT</h2>
                <p className="text-muted mb-4">List product description</p>
                <div className="row g-4">
                    <ProductCard sale={false} />
                    <ProductCard sale={false} />
                    <ProductCard sale={false} />
                    <ProductCard sale={true} />
                </div>
            </div>
        </div>
    );
}

function ProductCard({ sale }) {
    return (
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
            <div className="position-relative overflow-hidden">
                <img src="https://placehold.co/280x280" className="w-100" alt="Product" />
                {sale && (
                    <span
                        className="position-absolute bg-warning text-light text-center"
                        style={{
                            top: "12px",
                            right: "-40px",
                            width: "150px",
                            transform: "rotate(45deg)",
                            padding: "2px 0",
                            fontSize: "2rem",
                        }}
                    >
                        Sale
                    </span>
                )}
            </div>
            <div className="pt-2">
                <h6 className="text-primary mb-1">Product</h6>
                <p className="mb-2">
                    <span className="text-decoration-line-through text-muted me-2">100.000 vnd</span>
                    <span className="text-warning fw-bold">80.000 vnd</span>
                </p>
                <div className="d-flex gap-2">
                    <button className="btn btn-primary btn-sm">🛒</button>
                    <button className="btn btn-outline-secondary btn-sm">Xem chi tiết</button>
                </div>
            </div>
        </div>
    );
}