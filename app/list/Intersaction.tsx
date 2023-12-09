import React, { useEffect, useRef, useState } from "react";

export interface WithIntersectionObserverProps {
  isVisible: boolean;
  componentHeight: number;
}

const withIntersectionObserver = <P extends WithIntersectionObserverProps>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return (props: Omit<P, keyof WithIntersectionObserverProps>) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [componentHeight, setComponentHeight] = useState(0);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            } else {
              setIsVisible(false);
            }
          });
        },
        { threshold: 0.5 },
      );

      if (targetRef.current) {
        observer.observe(targetRef.current);
      }

      return () => {
        if (targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      };
    }, []);

    useEffect(() => {
      if (isVisible) {
        // 컴포넌트가 화면에 나타날 때의 로직
        console.log("Component is visible!");
      }
    }, [isVisible]);

    useEffect(() => {
      // 컴포넌트의 높이를 동적으로 계산
      setComponentHeight(targetRef.current?.clientHeight || 0);
    }, [isVisible]);

    return (
      <div
        ref={targetRef}
        style={{
          minHeight: isVisible ? componentHeight : 0,
          height: componentHeight,
          transition: "min-height 0.3s",
        }}
      >
        <WrappedComponent
          {...(props as P)}
          isVisible={isVisible}
          componentHeight={componentHeight}
        />
      </div>
    );
  };
};

export default withIntersectionObserver;
