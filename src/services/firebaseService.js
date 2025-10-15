import { database } from '../config/firebase';
import { ref, push, set, onValue, remove, update } from 'firebase/database';

// Blog Functions
export const createBlog = async (blogData) => {
  const blogsRef = ref(database, 'blogs');
  const newBlogRef = push(blogsRef);
  
  await set(newBlogRef, {
    ...blogData,
    id: newBlogRef.key,
    createdAt: Date.now()
  });
  
  return newBlogRef.key;
};

export const getAllBlogs = (callback) => {
  const blogsRef = ref(database, 'blogs');
  
  onValue(blogsRef, (snapshot) => {
    const data = snapshot.val();
    const blogsArray = data 
      ? Object.values(data).sort((a, b) => b.createdAt - a.createdAt)
      : [];
    callback(blogsArray);
  });
};

export const deleteBlog = async (blogId) => {
  const blogRef = ref(database, `blogs/${blogId}`);
  await remove(blogRef);
};

// Podcast Functions
export const createPodcast = async (podcastData) => {
  const podcastsRef = ref(database, 'podcasts');
  const newPodcastRef = push(podcastsRef);
  
  await set(newPodcastRef, {
    ...podcastData,
    id: newPodcastRef.key,
    createdAt: Date.now()
  });
  
  return newPodcastRef.key;
};

export const getAllPodcasts = (callback) => {
  const podcastsRef = ref(database, 'podcasts');
  
  onValue(podcastsRef, (snapshot) => {
    const data = snapshot.val();
    const podcastsArray = data 
      ? Object.values(data).sort((a, b) => b.createdAt - a.createdAt)
      : [];
    callback(podcastsArray);
  });
};

export const deletePodcast = async (podcastId) => {
  const podcastRef = ref(database, `podcasts/${podcastId}`);
  await remove(podcastRef);
};

// Gallery Functions
export const createGalleryItem = async (galleryData) => {
  const galleryRef = ref(database, 'gallery');
  const newItemRef = push(galleryRef);
  
  await set(newItemRef, {
    ...galleryData,
    id: newItemRef.key,
    createdAt: Date.now()
  });
  
  return newItemRef.key;
};

export const getAllGalleryItems = (callback) => {
  const galleryRef = ref(database, 'gallery');
  
  onValue(galleryRef, (snapshot) => {
    const data = snapshot.val();
    const galleryArray = data 
      ? Object.values(data).sort((a, b) => b.createdAt - a.createdAt)
      : [];
    callback(galleryArray);
  });
};

export const deleteGalleryItem = async (itemId) => {
  const itemRef = ref(database, `gallery/${itemId}`);
  await remove(itemRef);
};