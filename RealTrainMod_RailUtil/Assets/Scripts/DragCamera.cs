using UnityEngine;

public class DragCamera : MonoBehaviour
{
    private Vector3 dragOrigin;
    private bool isDragging = false;
    public float zoomSpeed = 4f; // 마우스 휠 줌 속도 조절
    public float minFOV = 15f; // 최소 FOV 값
    public float maxFOV = 130f; // 최대 FOV 값
    public float moveUnit = 0.5f; // 이동 단위
    public float minX = -1500f; // X 좌표 최소값
    public float maxX = 1500f; // X 좌표 최대값
    public float minZ = -1500f; // Z 좌표 최소값
    public float maxZ = 1500f; // Z 좌표 최대값

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

            // 좌표를 0.5 단위로 이동하도록 제한
            moveDirection.x = Mathf.Round(moveDirection.x / moveUnit) * moveUnit;
            moveDirection.y = Mathf.Round(moveDirection.y / moveUnit) * moveUnit;
            moveDirection.z = Mathf.Round(moveDirection.z / moveUnit) * moveUnit;

            // X 좌표 제한
            float newX = Mathf.Clamp(transform.position.x + moveDirection.x, minX, maxX);
            // Z 좌표 제한
            float newZ = Mathf.Clamp(transform.position.z + moveDirection.z, minZ, maxZ);

            transform.position = new Vector3(newX, transform.position.y, newZ);
        }
    }
}
