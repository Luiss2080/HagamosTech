import { create } from 'zustand';

const useModalStore = create((set) => ({
    isLoginOpen: false,
    isRegisterOpen: false,
    isTermsOpen: false,
    isContactOpen: false,
    isVideoOpen: false,
    videoData: null,

    openModal: (modalName, orderData = null) => {
        console.log("ModalStore | Abriendo:", modalName, "con orden:", orderData);
        set({
            isLoginOpen: modalName === 'loginModal',
            isRegisterOpen: modalName === 'registerModal',
            isTermsOpen: modalName === 'termsModal',
            isContactOpen: modalName === 'contactModal',
            isVideoOpen: modalName === 'videoModal',
            videoData: modalName === 'videoModal' ? orderData : null,
        });
    },

    closeModal: (modalName) => {
        console.log("ModalStore | Cerrando:", modalName);
        set({ [modalName]: false });
    },

    closeAllModals: () => {
        console.log("ModalStore | Cerrando todos los modales");
        set({
            isLoginOpen: false,
            isRegisterOpen: false,
            isTermsOpen: false,
            isContactOpen: false,
            isVideoOpen: false,
            videoData: null,
        });
    },

    setModalOpen: (modalName, isOpen, orderData = null) => {
        console.log(`ModalStore | Seteando ${modalName} a ${isOpen}`);
        set(() => {
            const updates = { [modalName]: isOpen };
            return updates;
        });
    }
}));

export default useModalStore;
