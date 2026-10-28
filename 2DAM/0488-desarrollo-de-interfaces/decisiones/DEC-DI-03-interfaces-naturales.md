# DEC-DI-03 · Tecnologías para interfaces naturales (RA2)

| Campo | Valor |
|---|---|
| Módulo / UD afectadas | MP0488 · UD06 |
| Estado | Propuesta |
| Fecha | 2026-10-27 |

## Contexto

El RA2 es nuevo en el RD 405/2023 y el material elaborado para el RD 450/2010 no lo cubre.

> «Genera interfaces naturales de usuario utilizando herramientas visuales.» Fuente: RD 405/2023, anexo I, 0488, RA2 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

> Criterios RA2.a–f: herramientas de aprendizaje automático, interfaz natural, reconocimiento de voz, detección del movimiento del cuerpo, detección de partes del cuerpo y realidad aumentada. Fuente: ídem, RA2.a–f.

> Prospectiva: «El consumo generalizado de dispositivos inteligentes, el auge de la inteligencia artificial (IA) y la realidad aumentada…» Fuente: RD 405/2023, art. segundo, apdo. cuatro (art. 8.l del RD 450/2010) ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221))

Condicionante técnico: la tecnología principal del módulo es JavaFX ([DEC-DI-01](DEC-DI-01-framework-gui.md)). MediaPipe ofrece API para Android, Python y web, pero no para Java de escritorio ([MediaPipe Tasks](https://ai.google.dev/edge/mediapipe/solutions/tasks)). Además, el `WebView` de JavaFX no da acceso a la cámara del navegador.

## Alternativas evaluadas

| Criterio | A. Híbrido: Vosk (Java) + web (MediaPipe Tasks, Teachable Machine, AR.js/A-Frame) | B. Python (MediaPipe + OpenCV + Vosk/Whisper) | C. Unity + AR Foundation / Vuforia | D. Android (ML Kit + ARCore) |
|---|---|---|---|---|
| C1 Normativa | ✅ Cubre RA2.a–f. Teachable Machine es la «herramienta visual» de entrenamiento (RA2.a/b) | ✅ Cubre RA2.a–e. La RA (RA2.f) es más costosa | ✅ RA y cuerpo; ➖ voz y entrenamiento con herramientas visuales | ✅ Cubre RA2.a–f |
| C2 Aplicabilidad profesional | ✅ La visión artificial en el navegador y la voz sin conexión se usan en productos reales (valoración propia) | ✅ Python es habitual en prototipado de IA (valoración propia) | ✅ Habitual en RA y juegos (valoración propia) | ✅ Habitual en apps móviles (valoración propia) |
| C3 Disponibilidad y coste | ✅ Todo gratuito; se ejecuta en local | ✅ Gratuito | ➖ Licencia Personal con condiciones; Vuforia con límites | ✅ Gratuito, pero requiere móviles Android compatibles con ARCore |
| C4 Popularidad y comunidad | ✅ MediaPipe y TensorFlow.js tienen una comunidad amplia (valoración propia) | ✅ (valoración propia) | ✅ (valoración propia) | ✅ (valoración propia) |
| C5 Vigencia y soporte | ✅ MediaPipe Tasks mantenido por Google. ➖ El binding Java de Vosk en Maven está en la versión 0.3.45 y no se actualiza desde hace tiempo, aunque la librería nativa sigue publicándose ([Maven Central](https://central.sonatype.com/artifact/com.alphacephei/vosk)) | ✅ | ✅ | ✅ |
| C6 Recursos didácticos | ✅ Guías oficiales con ejemplos web | ✅ | ✅ Documentación oficial de Unity y AR Foundation (valoración propia) | ➖ |
| C7 Continuidad curricular | ✅ La voz se integra en el gestor de taller (Java). La parte web conecta con DAW y con PMDM | ➖ Introduce un lenguaje nuevo | ➖ Introduce C# y un motor nuevo | ✅ Conecta con PMDM, pero se solapa con ese módulo |
| C8 Viabilidad en el aula | ✅ Solo hace falta navegador, webcam y micrófono. Sin instalaciones pesadas | ➖ Hay que instalar dependencias nativas | ❌ Equipos y curva de aprendizaje exigentes para 24 h | ❌ Hacen falta dispositivos físicos compatibles |

## Decisión

**Alternativa A (híbrida).**

- **Voz con Vosk dentro del gestor de taller.** Es sin conexión y en Java, y aporta un valor real al proyecto (HU15).
- **Cuerpo, gestos, cara y RA con tecnologías web.** MediaPipe Tasks Vision, Teachable Machine para el entrenamiento visual y AR.js/A-Frame para la RA.

Han pesado C1 (cubre los seis CE), C8 (funciona en los PC del aula) y C3 (todo gratuito y en local, sin enviar imágenes ni audio a terceros). El riesgo en C5 del binding Java de Vosk se acepta, porque su API es estable. Si se rompiera, se sustituye por la Web Speech API (en la nube, con aviso de privacidad) o por whisper.cpp (sin conexión).

## Consecuencias

- La UD06 usa dos entornos (Java y web). Se dedica 1 h a montar un servidor local (`localhost`, necesario para usar la cámara) y se dan plantillas de partida.
- **Privacidad:** los datos biométricos (imagen y voz) son categorías especiales en el RGPD. Por eso se procesa todo en local y no se guardan grabaciones del alumnado. Se trata en clase.
- **Plan B:** Python + MediaPipe (alternativa B) para equipos que no quieran usar web, o coordinación con PMDM (alternativa D).

## Fuentes

- RD 405/2023, art. segundo y anexo I, 0488 ([BOE-A-2023-13221](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-13221)). Consultado el 2026-10-27.
- Google AI Edge, MediaPipe Tasks ([ai.google.dev](https://ai.google.dev/edge/mediapipe/solutions/tasks)). Teachable Machine ([teachablemachine.withgoogle.com](https://teachablemachine.withgoogle.com/)). Consultados el 2026-10-27.
- Vosk ([alphacephei.com/vosk](https://alphacephei.com/vosk/)) · [Maven Central com.alphacephei:vosk](https://central.sonatype.com/artifact/com.alphacephei/vosk). Consultados el 2026-10-27.
- AR.js ([ar-js-org.github.io/AR.js-Docs](https://ar-js-org.github.io/AR.js-Docs/)) · A-Frame ([aframe.io](https://aframe.io/)). Consultados el 2026-10-27.
