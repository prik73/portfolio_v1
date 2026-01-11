                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlitchTransition } from '../components/ui/GlitchTransition';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
    const navigate = useNavigate();
    const [ripple, setRipple] = useState({ isActive: false, x: 0, y: 0 });

    const startTransition = (x, y, path) => {
        // 1. Start Ripple (Enter)
        setRipple({ isActive: true, x, y });

        // 2. Navigate halfway through (when screen is covered)
        // Adjust timing based on Ripple animation speed (0.8s -> ~400ms to cover)
        setTimeout(() => {
            navigate(path);
        }, 400);

        // 3. End Ripple (Exit/Fade) after page has likely mounted
        // Total animation time + buffer
        setTimeout(() => {
            setRipple((prev) => ({ ...prev, isActive: false }));
        }, 1000);
    };

    return (
        <TransitionContext.Provider value={{ ripple, startTransition }}>
            <GlitchTransition
                isActive={ripple.isActive}
            />
            {children}
        </TransitionContext.Provider>
    );
};

export const useTransition = () => {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error('useTransition must be used within a TransitionProvider');
    }
    return context;
};
