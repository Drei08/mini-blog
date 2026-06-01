import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';


const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Seja criativo e compartilhe suas ideias!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input type="text" 
          name="title" 
          required 
          placeholder="Nome do Título..." 
          onChange={(e) => setTitle(e.target.value)} 
          value={title} />
        </label>
         <label>
          <span>Url da Imagem:</span>
          <input type="text" 
          name="image" 
          required 
          placeholder="Insiera a Url da Imagem..." 
          onChange={(e) => setImage(e.target.value)} 
          value={image} />
        </label>
         <label>
          <span>Conteúdo:</span>
          <textarea name="body" 
          required 
          placeholder="Digite o conteúdo do post..." 
          onChange={(e) => setBody(e.target.value)} 
          value={body}>
          </textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input type="text" 
          name="tags" 
          required 
          placeholder="Insiera as Tags separadas com virgulas..." 
          onChange={(e) => setTags(e.target.value)} 
          value={tags} />
        </label>
        <button className="btn">Cadastrar</button>
        {/* {!loading && <button className="btn">Cadastrar</button>}
        {loading && <button className="btn" disabled>Cadastrando...</button>}
        {/* Exibe mensagem de erro, se houver */}
        {/* {error && <p className="error">{error}</p>} */} 
      </form>
    </div>
  )
}

export default CreatePost