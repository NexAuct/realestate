import React, { useState } from 'react';
import { Box, IconButton, Modal, Fade } from '@mui/material';
import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';

interface ImageGalleryProps {
  images: string[];
  alt?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt = 'Image' }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <Box
        component="img"
        src={images[0]}
        alt={alt}
        onClick={() => setOpen(true)}
        sx={{
          width: '100%',
          height: 200,
          objectFit: 'cover',
          cursor: 'pointer',
          borderRadius: 1
        }}
      />
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none'
          }}>
            <Box sx={{ position: 'relative' }}>
              <img
                src={images[currentIndex]}
                alt={`${alt} ${currentIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain'
                }}
              />
              
              <IconButton
                onClick={() => setOpen(false)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(0,0,0,0.5)',
                  color: 'white'
                }}
              >
                <Close />
              </IconButton>
              
              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrev}
                    sx={{
                      position: 'absolute',
                      left: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white'
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>
                  
                  <IconButton
                    onClick={handleNext}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white'
                    }}
                  >
                    <ChevronRight />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ImageGallery;