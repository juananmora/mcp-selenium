# Servidor MCP para Selenium WebDriver

Este proyecto implementa un servidor MCP (Model Context Protocol) para Selenium WebDriver, permitiendo que los modelos de AI puedan controlar navegadores web.

## Instalación

```bash
# Instalar dependencias
npm install
# o
pnpm install
```

## Uso

### Servidor MCP Oficial

El servidor MCP oficial implementa completamente el protocolo MCP y permite que los modelos de AI puedan interactuar con Selenium WebDriver.

```bash
# Iniciar el servidor MCP
npx tsx src/index.ts
```

El servidor se ejecutará y escuchará comandos a través de stdin/stdout.

### Cliente de Prueba

Para probar el servidor, puedes usar el cliente de prueba:

```bash
npx tsx src/client.ts
```

Este cliente se conectará al servidor, iniciará un navegador Chrome en modo headless, navegará a Google.com, tomará una captura de pantalla y finalmente cerrará el navegador.

## API

El servidor implementa las siguientes herramientas de MCP:

- `start_browser`: Inicia una sesión de navegador
- `navigate`: Navega a una URL
- `click_element`: Hace clic en un elemento
- `send_keys`: Envía texto a un elemento
- `take_screenshot`: Captura una captura de pantalla
- `close_session`: Cierra la sesión del navegador

## Integración con Claude y Otros LLMs

Para utilizar este servidor con Claude u otros LLMs que soporten MCP:

1. Compila el proyecto usando `npm run build` o `pnpm run build`
2. Configura el LLM para que use el ejecutable generado como servidor MCP
3. El LLM podrá controlar Selenium WebDriver a través del protocolo MCP

## Desarrollo

### Build

```bash
npm run build
# o
pnpm run build
```

### Test

```bash
npm test
# o
pnpm test
```

## Licencia

MIT 