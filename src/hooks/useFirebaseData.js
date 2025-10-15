import { useState, useEffect } from 'react';
import { getAllBlogs, getAllPodcasts, getAllGalleryItems } from '../services/firebaseService';

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBlogs((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  return { blogs, loading };
};

export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPodcasts((data) => {
      setPodcasts(data);
      setLoading(false);
    });
  }, []);

  return { podcasts, loading };
};

export const useGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllGalleryItems((data) => {
      setGallery(data);
      setLoading(false);
    });
  }, []);

  return { gallery, loading };
};