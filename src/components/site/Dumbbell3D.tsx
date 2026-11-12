import { useEffect, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

type Colors = { metal: string; dark: string; accent: string };
type SceneProps = {
  active: boolean;
  reduced: boolean;
  rotation: number;
  colors: Colors;
  scroll: MutableRefObject<number>;
  onReady: () => void;
};

// Feel constants
const DRAG_GAIN = 0.009;
const INERTIA_DAMP = 3.2;
const POINTER_YAW = 0.35;
const POINTER_PITCH = 0.2;
const IDLE_SPIN = 0.18;

function Plate({
  x,
  r,
  w,
  colors,
  accent,
}: {
  x: number;
  r: number;
  w: number;
  colors: Colors;
  accent?: boolean;
}) {
  return (
    <group position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[r, r, w, 64]} />
        <meshStandardMaterial color={colors.dark} metalness={0.7} roughness={0.42} />
      </mesh>
      <mesh>
        <torusGeometry args={[r - 0.02, 0.035, 12, 64]} />
        <meshStandardMaterial
          color={accent ? colors.accent : colors.metal}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      {[1, -1].map((s) => (
        <mesh key={s} position={[0, (w / 2 + 0.002) * s, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r * 0.35, r * 0.82, 48]} />
          <meshStandardMaterial color={colors.metal} metalness={0.95} roughness={0.18} side={2} />
        </mesh>
      ))}
    </group>
  );
}

function Dumbbell({
  active,
  reduced,
  rotation,
  colors,
  scroll,
  onReady,
  drag,
}: SceneProps & {
  drag: MutableRefObject<{ vx: number; vy: number; yaw: number; pitch: number }>;
}) {
  const group = useRef<Group>(null);
  const ready = useRef(false);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  }, [rotation, invalidate]);
  useFrame((state, delta) => {
    if (!ready.current) {
      ready.current = true;
      onReady();
    }
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    const d = drag.current;
    d.yaw += d.vx * dt;
    d.pitch += d.vy * dt;
    d.vx *= Math.exp(-INERTIA_DAMP * dt);
    d.vy *= Math.exp(-INERTIA_DAMP * dt);
    d.pitch = Math.max(-0.9, Math.min(0.9, d.pitch));
    if (active && !reduced) d.yaw += IDLE_SPIN * dt;
    const p = scroll.current;
    const k = reduced ? 1 : 1 - Math.exp(-6 * dt);
    const ty = d.yaw + rotation + p * 2.2 + (reduced ? 0 : state.pointer.x * POINTER_YAW);
    const tx = 0.35 + d.pitch + p * 0.8 - (reduced ? 0 : state.pointer.y * POINTER_PITCH);
    g.rotation.y += (ty - g.rotation.y) * k;
    g.rotation.x += (tx - g.rotation.x) * k;
    g.rotation.z = -0.35 + p * 0.5;
    const s = 1 - p * 0.35;
    g.scale.setScalar(s);
    g.position.y =
      (reduced || !active ? 0 : Math.sin(state.clock.elapsedTime * 0.8) * 0.06) + p * 0.6;
  });
  return (
    <group ref={group} rotation={[0.35, 0.5, -0.35]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 2.3, 32]} />
        <meshStandardMaterial color={colors.metal} metalness={1} roughness={0.15} />
      </mesh>
      {/* knurled grip */}
      {Array.from({ length: 14 }, (_, i) => (
        <mesh key={i} position={[-0.42 + i * 0.065, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.074, 0.008, 6, 24]} />
          <meshStandardMaterial color={colors.dark} metalness={0.8} roughness={0.5} />
        </mesh>
      ))}
      {[1, -1].map((s) => (
        <group key={s}>
          <Plate x={0.68 * s} r={0.62} w={0.13} colors={colors} accent />
          <Plate x={0.84 * s} r={0.5} w={0.11} colors={colors} />
          <Plate x={0.97 * s} r={0.38} w={0.09} colors={colors} />
          <mesh position={[1.08 * s, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 32]} />
            <meshStandardMaterial color={colors.accent} metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function Dumbbell3D(props: SceneProps) {
  const drag = useRef({ vx: 0, vy: 0, yaw: 0, pitch: 0 });
  const last = useRef<{ x: number; y: number; t: number } | null>(null);
  const down = (e: React.PointerEvent) => {
    last.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    const l = last.current;
    if (!l) return;
    const now = performance.now();
    const dt = Math.max(16, now - l.t) / 1000;
    const dx = e.clientX - l.x,
      dy = e.clientY - l.y;
    drag.current.yaw += dx * DRAG_GAIN;
    drag.current.pitch += dy * DRAG_GAIN;
    drag.current.vx = (dx * DRAG_GAIN) / dt;
    drag.current.vy = (dy * DRAG_GAIN) / dt;
    last.current = { x: e.clientX, y: e.clientY, t: now };
  };
  const up = () => {
    last.current = null;
  };
  return (
    <div
      className="h-full w-full cursor-grab active:cursor-grabbing"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      data-cursor="drag"
    >
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 38 }}
        dpr={[1, 1.5]}
        frameloop={props.active && !props.reduced ? "always" : "demand"}
        gl={{ antialias: true, alpha: true }}
        aria-label="Interactive 3D dumbbell — drag to rotate"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={2.6} />
        <spotLight position={[-4, 2, 3]} intensity={30} color={props.colors.accent} angle={0.5} />
        <Environment resolution={64}>
          <Lightformer intensity={3} position={[0, 4, 2]} scale={[8, 3, 1]} />
          <Lightformer
            intensity={1.5}
            color={props.colors.accent}
            position={[-4, 0, 2]}
            rotation-y={Math.PI / 2}
            scale={[3, 6, 1]}
          />
          <Lightformer
            intensity={1}
            position={[4, -1, 1]}
            rotation-y={-Math.PI / 2}
            scale={[3, 4, 1]}
          />
        </Environment>
        <Dumbbell {...props} drag={drag} />
        <ContactShadows position={[0, -1.05, 0]} opacity={0.45} scale={5} blur={2.6} far={2} />
      </Canvas>
    </div>
  );
}
