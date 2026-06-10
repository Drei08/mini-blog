import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom'

//Hooks
import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {

  const { user } = useAuthValue()
  const uid = user.uid

  const {documents: posts, loading} = useFetchDocuments("posts", null, uid)
  
  const { deleteDocument } = useDeleteDocument("posts")

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus Posts!</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados Posts</p>
          <Link to="/posts/create" className='btn'>
          Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>

          {posts && 
          posts.map((post) => (
            <div key={post.id} className={styles.post_row}>
              <p>{post.title}</p>
              <div>
              <Link to={`/posts/${post.id}`} className="btn btn-outiline">
                Ver
              </Link>
              <Link to={`/posts/edit/${post.id}`} className="btn btn-outilne">
                Editar
              </Link>
              <button onClick={() => deleteDocument(post.id)} 
                className="btn btn-outiline btn-danger"
              >
                Excluir
              </button>
            </div>
          </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Dashboard