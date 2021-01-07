

const ProductCreateForm = ({handleSubmit, handleChanged, values}) => {
    const { title, description, price, category, sub_category, quantity, images, color, brand, colors, brands, shipping, categories, subcategories } = values;
 
    return (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" className="form-control" value={title} onChange={handleChanged} />
        </div>
        <div className="form-group">
            <label>Description</label>
            <input type="text" name="description" className="form-control" value={description} onChange={handleChanged} />
        </div>
        <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" className="form-control" value={price} onChange={handleChanged} />
        </div>
        <div className="form-group">
            <label>Shipping</label>
            <select className="form-control" name="shipping" value={shipping} onChange={handleChanged}>
                <option value="">Please Select Shipping</option>                   
                <option value="YES">Yes</option>
                <option value="No">No</option>
            </select>
        </div>
        <div className="form-group">
            <label>Quantity</label>
            <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChanged} />
        </div>
        <div className="form-group">
            <label>Color</label>
            <select className="form-control" name="color" value={color} onChange={handleChanged}>
                <option value="" key="color-0">Please Select Color</option>                              
                { colors.map((data, index)=>(
                    <option value={data} key={`color-${index}`}>{data}</option>
                )) }
            </select>
        </div>
        <div className="form-group">
            <label>Brand</label>
            <select className="form-control" name="brand" value={brand} onChange={handleChanged}>
                <option value="">Please Select Brand</option>                              
                { brands.map((data, index)=>(
                    <option value={data} key={`brand-${index}`}>{data}</option>
                )) }
            </select>
        </div>
        <div className="form-group">
            <label>Category</label>
            <select className="form-control" name="category" value={category} onChange={handleChanged}>
                <option value="" key="color-0">Please Select Category</option>                              
                { categories.map((data, index)=>(
                    <option value={data._id} key={`category-${index}`}>{data.name}</option>
                )) }
            </select>
        </div>
        <button className="btn btn-info">Save</button>
    </form>
    );
}

export default ProductCreateForm;