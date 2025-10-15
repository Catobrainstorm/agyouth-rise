import React from 'react';

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    onClick,
    href,
    type = 'button',
    disabled = false,
    icon: Icon,
    iconPosition = 'left'
    }) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';
    
    const variants = {
        primary: 'bg-[#FFD60D] text-[#0D3A1B] hover:bg-[#E4B600] hover:shadow-xl',
        secondary: 'bg-[#35CC67] text-white hover:bg-[#218342] hover:shadow-xl',
        outline: 'border-2 border-[#35CC67] text-[#35CC67] hover:bg-[#35CC67] hover:text-white',
        dark: 'bg-[#0D3A1B] text-white hover:bg-[#196330] hover:shadow-xl',
        ghost: 'text-[#35CC67] hover:bg-[#35CC67]/10',
    };
    
    const sizes = {
        sm: 'px-4 py-2 text-sm gap-1.5',
        md: 'px-6 py-3 text-base gap-2',
        lg: 'px-8 py-4 text-lg gap-2.5',
    };
    
    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
    
    const content = (
        <>
        {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
        </>
    );
    
    if (href) {
        return (
        <a 
            href={href} 
            className={combinedClassName}
            onClick={onClick}
        >
            {content}
        </a>
        );
    }
    
    return (
        <button
        type={type}
        className={combinedClassName}
        onClick={onClick}
        disabled={disabled}
        >
        {content}
        </button>
    );
    };

    // Example usage demonstration
    const ButtonShowcase = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0D3A1B] to-[#196330] p-8">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-display font-bold text-white mb-12 text-center">
            AgYouth Rise Button Components
            </h1>
            
            <div className="grid gap-8">
            {/* Primary Buttons */}
            <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-display font-bold text-[#0D3A1B] mb-6">
                Primary Buttons (Yellow - Main CTAs)
                </h2>
                <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">Small Button</Button>
                <Button variant="primary" size="md">Medium Button</Button>
                <Button variant="primary" size="lg">Large Button</Button>
                <Button variant="primary" size="md" disabled>Disabled</Button>
                </div>
            </div>

            {/* Secondary Buttons */}
            <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-display font-bold text-[#0D3A1B] mb-6">
                Secondary Buttons (Green - Actions)
                </h2>
                <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="sm">Small Button</Button>
                <Button variant="secondary" size="md">Medium Button</Button>
                <Button variant="secondary" size="lg">Large Button</Button>
                </div>
            </div>

            {/* Outline Buttons */}
            <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-display font-bold text-[#0D3A1B] mb-6">
                Outline Buttons
                </h2>
                <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm">Small Button</Button>
                <Button variant="outline" size="md">Medium Button</Button>
                <Button variant="outline" size="lg">Large Button</Button>
                </div>
            </div>

            {/* Dark Buttons */}
            <div className="bg-[#FCE445] rounded-2xl p-8">
                <h2 className="text-2xl font-display font-bold text-[#0D3A1B] mb-6">
                Dark Buttons
                </h2>
                <div className="flex flex-wrap gap-4">
                <Button variant="dark" size="md">Dark Button</Button>
                <Button variant="ghost" size="md">Ghost Button</Button>
                </div>
            </div>

            {/* CTA Examples */}
            <div className="bg-gradient-to-r from-[#218342] to-[#35CC67] rounded-2xl p-8">
                <h2 className="text-2xl font-display font-bold text-white mb-6">
                Primary CTAs for AgYouth Rise
                </h2>
                <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                    Become a Member
                </Button>
                <Button variant="primary" size="lg">
                    Become a Volunteer
                </Button>
                <Button variant="dark" size="lg">
                    Partner With Us
                </Button>
                </div>
            </div>

            {/* Usage Instructions */}
            <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-display font-bold text-[#0D3A1B] mb-4">
                Usage Instructions
                </h2>
                <div className="space-y-4 text-[#196330]">
                <div className="bg-[#FCE445]/20 p-4 rounded-lg">
                    <code className="text-sm">
                    {`<Button variant="primary" size="md">Click Me</Button>`}
                    </code>
                </div>
                <div className="space-y-2 text-sm">
                    <p><strong>Variants:</strong> primary, secondary, outline, dark, ghost</p>
                    <p><strong>Sizes:</strong> sm, md, lg</p>
                    <p><strong>Props:</strong> onClick, href, disabled, icon, iconPosition</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Button;
export { ButtonShowcase };