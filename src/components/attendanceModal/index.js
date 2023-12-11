import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const attendaceModal = () => {
    const [modalAberto, setModalAberto] = true;

    return (
        <div>
            <button onClick={() => setModalAberto(true)}>Abrir Modal</button>

            <Modal
                isOpen={modalAberto}
                onRequestClose={() => setModalAberto(false)}
            >
                <h2>Conteúdo do Modal</h2>
                <button onClick={() => setModalAberto(false)}>Fechar Modal</button>
            </Modal>
        </div>
    );
};

export default attendaceModal;
