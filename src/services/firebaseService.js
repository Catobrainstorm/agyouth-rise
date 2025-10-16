import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

// Blog Functions
export const createBlog = async (blogData) => {
  try {
    const blogsRef = collection(db, 'blogs');
    const docRef = await addDoc(blogsRef, {
      ...blogData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export const getAllBlogs = (callback) => {
  const blogsRef = collection(db, 'blogs');
  const q = query(blogsRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const blogsArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(blogsArray);
  }, (error) => {
    console.error('Error fetching blogs:', error);
    callback([]);
  });
};

export const deleteBlog = async (blogId) => {
  try {
    const blogRef = doc(db, 'blogs', blogId);
    await deleteDoc(blogRef);
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};

// Podcast Functions
export const createPodcast = async (podcastData) => {
  try {
    const podcastsRef = collection(db, 'podcasts');
    const docRef = await addDoc(podcastsRef, {
      ...podcastData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating podcast:', error);
    throw error;
  }
};

export const getAllPodcasts = (callback) => {
  const podcastsRef = collection(db, 'podcasts');
  const q = query(podcastsRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const podcastsArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(podcastsArray);
  }, (error) => {
    console.error('Error fetching podcasts:', error);
    callback([]);
  });
};

export const deletePodcast = async (podcastId) => {
  try {
    const podcastRef = doc(db, 'podcasts', podcastId);
    await deleteDoc(podcastRef);
  } catch (error) {
    console.error('Error deleting podcast:', error);
    throw error;
  }
};

// Gallery Functions
export const createGalleryItem = async (galleryData) => {
  try {
    const galleryRef = collection(db, 'gallery');
    const docRef = await addDoc(galleryRef, {
      ...galleryData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating gallery item:', error);
    throw error;
  }
};

export const getAllGalleryItems = (callback) => {
  const galleryRef = collection(db, 'gallery');
  const q = query(galleryRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const galleryArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(galleryArray);
  }, (error) => {
    console.error('Error fetching gallery items:', error);
    callback([]);
  });
};

export const deleteGalleryItem = async (itemId) => {
  try {
    const itemRef = doc(db, 'gallery', itemId);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw error;
  }
};