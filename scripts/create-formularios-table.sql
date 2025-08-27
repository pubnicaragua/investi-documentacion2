-- Crear tabla para almacenar los formularios de la landing page
CREATE TABLE IF NOT EXISTS formularios_landing (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  objetivo_financiero TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento de las consultas
CREATE INDEX IF NOT EXISTS idx_formularios_email ON formularios_landing(email);
CREATE INDEX IF NOT EXISTS idx_formularios_created_at ON formularios_landing(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE formularios_landing ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserción desde la aplicación
CREATE POLICY "Allow insert for authenticated users" ON formularios_landing
  FOR INSERT WITH CHECK (true);

-- Crear política para permitir lectura desde la aplicación
CREATE POLICY "Allow read for authenticated users" ON formularios_landing
  FOR SELECT USING (true);

-- Comentarios para documentar la tabla
COMMENT ON TABLE formularios_landing IS 'Almacena los datos de los formularios enviados desde la landing page';
COMMENT ON COLUMN formularios_landing.nombre IS 'Nombre completo del usuario';
COMMENT ON COLUMN formularios_landing.email IS 'Email del usuario';
COMMENT ON COLUMN formularios_landing.telefono IS 'Número de teléfono del usuario';
COMMENT ON COLUMN formularios_landing.objetivo_financiero IS 'Objetivo financiero seleccionado por el usuario';
COMMENT ON COLUMN formularios_landing.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN formularios_landing.updated_at IS 'Fecha y hora de última actualización';
