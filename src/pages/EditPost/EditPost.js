  import styles from './EditPost.module.css';

  import { useState, useEffect } from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import { useAuthValue } from '../../context/AuthContext';
  import { useFetchDocument } from '../../hooks/useFetchDocument';
  import { useUpdateDocument } from '../../hooks/useUpdateDocument';


  const EditPost = () => {
    const { id } = useParams()
    const { document: post } = useFetchDocument("posts", id)

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState(''); 

    useEffect(() => {
      
      if(post) {
        setTitle(post.title);
        setBody(post.body);
        setImage(post.image);

        const textTags = post.tagsArray.join(", ")

        setTags(textTags);
      }
    }, [post]);
    

    const { user } = useAuthValue();

    const {updateDocument, response} = useUpdateDocument("posts");

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

      const data = { 
        title, 
        image, 
        body, 
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
      }

      updateDocument(id, data);

      //redirect to home page
      navigate('/dashboard');
    };

    return (
      <div className={styles.edit_post}>
        {post && (
          <>
            <h2>Editando Post: {post.title}</h2>
            <p>Altere os dados do post</p>
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
              <p className={styles.title_preview}>Preview da imagem atual:</p>
              <img 
              className={styles.image_preview} 
              src={post.image} 
              alt={post.title} 
              />
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
          </>
        )}
      </div>
    )
  }

  export default EditPost