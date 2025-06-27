import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PropertyDetails from '../components/property/PropertyDetails';

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/properties');
  };

  if (!id) {
    return <div>Property not found</div>;
  }

  return (
    <PropertyDetails
      propertyId={id}
      onBack={handleBack}
    />
  );
};

export default PropertyDetailsPage;