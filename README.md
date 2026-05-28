# TRON Snake

Versión del juego clásico Snake desarrollada con React + Vite, con estética futurista inspirada en el universo visual tipo TRON: grids de neón, scanlines, paneles HUD y efectos de brillo cyan.

---

## Tecnologías

- React
- Vite
- JavaScript (ES2020+)
- CSS Modules
- HTML / CSS

---

## Funcionalidades

- Movimiento con teclas de flecha y WASD
- Crecimiento de la serpiente al comer núcleos de energía
- Detección de colisiones con paredes y con el propio cuerpo
- Pantalla de inicio, pausa y game over
- Puntaje en tiempo real
- High score persistente (localStorage)
- Dificultad progresiva basada en puntaje (5 niveles)
- Interfaz HUD con estado del sistema, nivel y velocidad
- Estética visual neón: grid animado, scanlines sutiles, bordes angulares

---

## Instalación

```bash
npm install
```

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Previsualiza el build local |

---

## Ejecución en desarrollo

```bash
npm run dev
```

Luego abre [http://localhost:5173](http://localhost:5173) en el navegador.

---

## Build de producción

```bash
npm run build
```

Los archivos quedan en la carpeta `dist/`.

---

## Cómo jugar

| Control | Acción |
|---|---|
| Flechas / WASD | Mover la serpiente |
| Space | Iniciar / pausar / continuar |
| R | Reiniciar partida |

- Come núcleos de energía para crecer y sumar puntos.
- Evita chocar contra las paredes o contra tu propio cuerpo.
- El juego se vuelve más rápido a medida que sube el puntaje.
- El high score se guarda automáticamente entre sesiones.

### Sistema de dificultad

| Puntaje | Nivel | Velocidad |
|---|---|---|
| 0 – 49 | 1 | 170 ms/tick |
| 50 – 99 | 2 | 150 ms/tick |
| 100 – 149 | 3 | 130 ms/tick |
| 150 – 199 | 4 | 110 ms/tick |
| 200+ | 5 | 90 ms/tick |

---

## Estructura del proyecto

```
src/
├── components/
│   ├── game/
│   │   └── Game.jsx          # Contenedor principal: estado, loop, score y gameStatus
│   ├── board/
│   │   └── Board.jsx         # Renderiza el tablero 20×20
│   ├── entities/
│   │   ├── Snake.jsx         # Renderiza la serpiente celda por celda
│   │   └── Food.jsx          # Renderiza el núcleo de energía
│   ├── hud/
│   │   ├── Score.jsx         # Muestra score y high score
│   │   └── HudPanel.jsx      # Panel reutilizable para datos del HUD
│   ├── screens/
│   │   ├── StartScreen.jsx   # Pantalla de inicio
│   │   ├── PauseScreen.jsx   # Pantalla de pausa
│   │   └── GameOverScreen.jsx# Pantalla de game over con puntajes finales
│   └── ui/
│       └── NeonButton.jsx    # Botón reutilizable con variantes (primary/secondary/danger)
├── hooks/
│   ├── useKeyboardControls.js# Captura teclas y despacha acciones de juego
│   └── useGameLoop.js        # Ejecuta onTick cada N ms cuando isRunning es true
├── systems/
│   ├── movementSystem.js     # Calcula nueva posición de la serpiente
│   ├── collisionSystem.js    # Detecta colisiones con pared, cuerpo y comida
│   └── foodSystem.js         # Genera posición aleatoria de comida fuera de la serpiente
├── constants/
│   ├── gameConfig.js         # BOARD_SIZE, INITIAL_SPEED, POINTS_PER_FOOD, etc.
│   ├── directions.js         # Vectores de dirección (UP, DOWN, LEFT, RIGHT)
│   └── gameStatus.js         # Estados del juego (START, RUNNING, PAUSED, GAME_OVER)
└── styles/
    ├── index.css             # Reset global e imports
    ├── variables.css         # Variables CSS: colores, sombras, fuentes
    └── animations.css        # Keyframes: pulseGlow, softFlicker, gridMove
```

---

## Diseño visual

La interfaz usa CSS Modules con variables CSS centralizadas. El fondo combina un grid animado con líneas cyan, radial gradients de acento (cyan, magenta y naranja) y una capa de scanlines muy sutil para simular una pantalla retro. Los paneles HUD y las pantallas de overlay usan bordes de neón, esquinas angulares decorativas y animaciones de parpadeo.
