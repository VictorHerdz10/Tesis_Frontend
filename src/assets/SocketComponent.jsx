import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SusComponent = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState('');
  const PUBLIC_VAPID_KEY = 'BPVThlJFc3YeQQmBDiDHscY-1EdUV866lJw0VmiG75b29V2idyrs-LtLtgh-q_uWQuYpguh8jGxrWB6upl1_mp0';

  useEffect(() => {
    navigator.serviceWorker.register('/service-worker.js');
    initializeSWAndSubscribe();
  }, []);

  const initializeSWAndSubscribe = async () => {
    try {
      // Intentamos obtener la suscripción del service worker
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      
      if (registration) {
        const pushManager = registration.pushManager;
        
        // Obtenemos todas las suscripciones activas
        let subscriptions = await pushManager.getSubscription();
        
        if (!subscriptions) {
          // Si no hay suscripciones, creamos una nueva
          subscriptions = await pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: PUBLIC_VAPID_KEY
          });
          // Enviamos la suscripción al servidor
          await axios.post('http://localhost:4000/api/notificaciones/subscribete', subscriptions.toJSON());
          
          setIsSubscribed(true);
          console.log('Usuario suscrito:', subscriptions.toJSON());
        } else {
          setIsSubscribed(true);
          console.log('Ya estaba suscrito:', subscriptions.toJSON());
        }
      }
    } catch (error) {
      console.error('Error al verificar el estado de suscripción:', error);
    }
  };

  const sendMessage = async () => {
    if (isSubscribed && message.trim()) {
      try {
        await axios.post('http://localhost:4000/api/notificaciones/enviar', { message });
        console.log('Mensaje enviado:', message);
        setMessage('');
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    }
  };

  return (
    <div>
      <h2>Notificaciones Push</h2>
      {isSubscribed ? (
        <>
          <p>El usuario está suscrito.</p>
          <input 
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ingrese su mensaje"
          />
          <button onClick={sendMessage}>Enviar Mensaje</button>
        </>
      ) : (
        <p>El usuario no está suscrito.</p>
      )}
    </div>
  );
};

export default SusComponent;