import React from 'react';

const Posts = ({ posts, loading,getuser }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
         <tbody>
            {posts.map(post => (
                <tr style={{cursor:"pointer"}} onClick={()=> getuser(post.nom,post.prenom,post.email,post.dateCreation,post.sName)} >
                       <td >
                         {post.prenom}  {post.nom}
                       </td>
                    <td >
                        {post.telephone}
                    </td>
                    <td >
                        {post.email}
                    </td>
                    <td >
                        {post.sName}
                    </td>
                    <td>
                        {post.dateCreation}
                    </td>
                    <td>
                        <a href="javascript:void(0);" className="action-icon"> <i
                            className="mdi mdi-square-edit-outline"></i></a>
                        <a href="javascript:void(0);" className="action-icon"> <i className="mdi mdi-delete"></i></a>
                    </td>

                </tr>

            ))}
         </tbody>

    );
};

export default Posts;