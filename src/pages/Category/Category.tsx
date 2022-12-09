import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './category.css';
import categories from '../../assets/categories.json';
import invert from 'invert-color';
import { query, where, getDocs, collection } from 'firebase/firestore';
import { PostType } from '../../global/types';
import { db } from '../../services/firebase';
import PostItem from '../../layouts/Post/PostItem';
import CreatePostButton from '../../components/Buttons/CreatePostButton';
import EmptyCategoryDialog from '../../components/Dialogs/EmptyCategoryDialog';
import SEO from '../../utils/SEO/SEO';

const Category: React.FC = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState<PostType | any>([]);

  const categoryIndex = categories.categories.findIndex((c) => c.name === category);
  const description = categories.categories[categoryIndex].description;
  const image = categories.categories[categoryIndex].image;
  const bgColor = categories.categories[categoryIndex].color;
  const textColor = invert(bgColor, { black: '#000', white: '#fff' });

  useEffect(() => {
    const getPostByCategory = async () => {
      const q = query(collection(db, 'posts'), where('category', '==', category));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        setPosts((prevPosts: any) => [...prevPosts, { ...doc.data(), pid: doc.id }]);
      });
    };
    getPostByCategory();
  }, [category]);

  return (
    <>
      <SEO
        title={category}
        description={description}
        type="article"
        url={'https://myjar-8ff23.web.app/category/' + category}
        image={image}
      />

      <div className="min-h p-0">
        <div className="category-wrapper" style={{ backgroundColor: bgColor }}>
          <div className="category-header">
            <h2 style={{ color: textColor }} className="text-capitalize text-center p-3 fs-1 fw-bolder">
              {category}
            </h2>
          </div>
          <div className="category-subheader">
            <div className="category-detail-container">
              <p className="story-counter" style={{ color: textColor }}>
                {posts.length} posts
              </p>
              <CreatePostButton style={{ color: textColor }} variant="none" text="Start Writing" />
            </div>
            <p className="category-description" style={{ color: textColor }}>
              {description}
            </p>
          </div>
        </div>
        <div className="category-post-container">
          {posts.length === 0 ? (
            <div className="mx-3">
              <EmptyCategoryDialog category={category} />
            </div>
          ) : (
            posts.map((p: PostType, i: React.Key) => <PostItem key={i} posts={p} />)
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
