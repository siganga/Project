import React, { useState } from 'react';
//Makes use of Signup page css, since they are so similar
import '../pages/Signup.css';
import { createProduct } from '../redux/productSlice';
import { useSelector, useDispatch } from 'react-redux';

const ProductAdd = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const[error, setError] = useState(null)

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth.user)

        const handleSubmit = async (e) =>{
          e.preventDefault()

          if(!user){
            setError('You must be logged in')
            console.log('You must be logged in to add')
            return
          }

          const formData = new FormData();
          formData.append('title', title);
          author.forEach(auth => {
            formData.append('author[]', auth);
          });
          formData.append('desc', desc);
          formData.append('price', price);
          formData.append('image', image);
          category.forEach(cat => {
            formData.append('category[]', cat);
          });

          const response = await fetch('http://localhost:5000/api/products/',{
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })

          const json = await response.json()

          if(!response.ok){
            setError(json.error)

          }

          if(response.ok){
            dispatch(createProduct(json))
            setTitle('')
            setAuthor([])
            setDesc('')
            setImage(null);
            setError(null)
            console.log('New product added',json)

          }


        }

        const handleCategoryChange = (event) => {
          const options = event.target.options;
          const selectedOptions = [];
          for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
              selectedOptions.push(options[i].value);
            }
          }
          setCategory(selectedOptions);
        }

        const handleAddCategory = () => {
          if (newCategory && !category.includes(newCategory)) {
            setCategory([...category, newCategory]);
            setNewCategory('');
          }
        }

        const handleAddAuthor = () => {
          if (newAuthor && !author.includes(newAuthor)) {
            setAuthor([...author, newAuthor]);
            setNewAuthor('');
          }
        }

  return (
    <form onSubmit={handleSubmit} enctype= "multipart/form-data">

      <h3>Add a New product</h3>



      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          placeholder = "Title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <ul>
           {author.map(auth => (
             <li key={auth}>{auth}</li>
           ))}
         </ul>
         <input
           type="text"
           value={newAuthor}
           onChange={(event) => setNewAuthor(event.target.value)}
         />
         <button type="button" onClick={handleAddAuthor}>Add Author</button>
      </div>
      <div>
        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          id="desc"
          value={desc}
          placeholder = "Description"
          onChange={(event) => setDesc(event.target.value)}
        />
      </div>
      <div>
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        value={price}
        placeholder = "Price"
        onChange={(event) => setPrice(event.target.value)}
      />
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <select multiple={true} value={category} onChange={handleCategoryChange}>
           {category.map(cat => (
             <option key={cat} value={cat}>{cat}</option>
           ))}
         </select>
         <input
           type="text"
           value={newCategory}
           onChange={(event) => setNewCategory(event.target.value)}
         />
         <button type="button" onClick={handleAddCategory}>Add Category</button>
      </div>

    <div>
      <label htmlFor="img">Image</label>
      <input
        type="file"
        onChange={event => setImage(event.target.files[0])}
        name = "image"
      />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductAdd;
