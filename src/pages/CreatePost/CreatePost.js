  import styles from './CreatePost.module.css';

  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAuthValue } from '../../context/AuthContext';
  import { useInsertDocument } from '../../hooks/useInsertDocument';


  const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState(''); 

    const { user } = useAuthValue();

    const {insertDocument, response} = useInsertDocument("posts");

    const handleSubmit = (e) => {
      e.preventDefault();
      setFormError("");
      
      //validate image url

      //criar array de tags

      //checar todos os valores

      insertDocument({ 
        title, 
        image, 
        body, 
        tags,
        uid: user.uid,
        createdBy: user.displayName,
      });

      //redirect to home page

    };

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
          {!response.loading && <button className="btn">Cadastrar</button>}
          {response.loading && <button className="btn" disabled>Cadastrando...</button>}
          {/* Exibe mensagem de erro, se houver */}
          {response.error && <p className="error">{response.error}</p>}
        </form>
      </div>
    )
  }

  export default CreatePost