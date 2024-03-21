using UnityEngine;

public class DragCamera : MonoBehaviour
{
    private Vector3 dragOrigin;
    private bool isDragging = false;
    public float zoomSpeed = 4f; // 마우스 휠 줌 속도 조절
    public float minFOV = 15f; // 최소 FOV 값
    public float maxFOV = 130f; // 최대 FOV 값

    void Update()
    {
        if (RailCreateManager.Instance.railCreateMode.Equals(true)) return;
        // 마우스 휠 입력으로 FOV 조절
        float scroll = Input.GetAxis("Mouse ScrollWheel");
        Camera.main.fieldOfView -= scroll * zoomSpeed;
        Camera.main.fieldOfView = Mathf.Clamp(Camera.main.fieldOfView, minFOV, maxFOV);

        // 마우스 드래그로 카메라 이동 시작
        if (Input.GetMouseButtonDown(0))
        {
            isDragging = true;
            dragOrigin = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, Camera.main.transform.position.y));
        }

        // 마우스 버튼을 떼면 드래그 중지
        if (Input.GetMouseButtonUp(0))
        {
            isDragging = false;
        }

        // 드래그 중 카메라 이동
        if (isDragging)
        {
            Vector3 currentMousePosition = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, Camera.main.transform.position.y));
            Vector3 moveDirection = dragOrigin - currentMousePosition;
            transform.position += moveDirection;
        }

    }
}
