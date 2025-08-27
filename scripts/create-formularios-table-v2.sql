-- Crear tabla actualizada para almacenar los formularios de la landing page
-- Esta versión incluye todos los campos que envía el formulario

-- Primero eliminar la tabla anterior si existe
DROP TABLE IF EXISTS formularios_landing;

-- Crear la nueva tabla con todos los campos correctos
CREATE TABLE formularios_landing (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  age VARCHAR(20),
  goals TEXT[], -- Array de objetivos
  interests TEXT[], -- Array de intereses
  timestamp TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_formularios_email ON formularios_landing(email);
CREATE INDEX IF NOT EXISTS idx_formularios_created_at ON formularios_landing(created_at);
CREATE INDEX IF NOT EXISTS idx_formularios_age ON formularios_landing(age);

-- Habilitar Row Level Security (RLS)
ALTER TABLE formularios_landing ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserción desde la aplicación
CREATE POLICY "Allow insert for all" ON formularios_landing
  FOR INSERT WITH CHECK (true);

-- Crear política para permitir lectura desde la aplicación
CREATE POLICY "Allow read for all" ON formularios_landing
  FOR SELECT USING (true);

-- Comentarios para documentar la tabla
COMMENT ON TABLE formularios_landing IS 'Almacena los datos de los formularios enviados desde la landing page de Investi';
COMMENT ON COLUMN formularios_landing.name IS 'Nombre completo del usuario';
COMMENT ON COLUMN formularios_landing.email IS 'Email del usuario';
COMMENT ON COLUMN formularios_landing.phone IS 'Número de teléfono del usuario (opcional)';
COMMENT ON COLUMN formularios_landing.age IS 'Rango de edad seleccionado';
COMMENT ON COLUMN formularios_landing.goals IS 'Array de objetivos financieros seleccionados';
COMMENT ON COLUMN formularios_landing.interests IS 'Array de intereses de inversión seleccionados';
COMMENT ON COLUMN formularios_landing.timestamp IS 'Timestamp enviado desde el frontend';
COMMENT ON COLUMN formularios_landing.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN formularios_landing.updated_at IS 'Fecha y hora de última actualización';
