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

    const {insertDocument, response} = useInsertDocument("po");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      setFormError("");
      
      //validate image url
      try{
        new URL(image);
      }catch(error){
        setFormError("A imagem precisa ser uma URL.");
        return;
      }
      //criar array de tags
      //padronizar as tags para conseguir buscar melhor na pesquisa
      const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
      //checar todos os valores

      if(!title || !image || !body || !tags){
        setFormError("Por favor, preencha todos os campos!");
        return;
      }

      if(formError){
        return;
      }

      insertDocument({ 
        title, 
        image, 
        body, 
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
      });

      //redirect to home page
      navigate('/');
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
          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
    )
  }

  export default CreatePost