import React, { forwardRef, useEffect, useRef } from 'react';

const DivSelectM = forwardRef(({ options = [], icon = 'fas fa-pills', placeholder = '', name, id, value, className, required, handleChange }, ref) => {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (input.current && required) {
            input.current.focus();  // Enfoca si es requerido
        }
    }, [required]);

    return (
        <div className="input-group mb-3">
            <span className="input-group-text">
                <i className={icon}></i>
            </span>
            <select
                name={name}
                id={id}
                value={value}
                className={className}
                ref={input}
                required={required}
                onChange={handleChange}
            >
                {options && options.length > 0 ? (
                    options.map((medicamento) => (
                        <option value={medicamento.id} key={medicamento.id}>{medicamento.name}</option>
                    ))
                ) : (
                    <option value="">No hay medicamentos disponibles</option>
                )}
            </select>
        </div>
    );
});

export default DivSelectM;
