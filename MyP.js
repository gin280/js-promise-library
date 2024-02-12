public class LookTrigger: MonoBehaviour {
  [Range(0f, 1f)]
  public float lookness = 0.5f;

  public Transform objTf;

  void onDrawGizmos() {
    Vector2 center = transform.position;
    Vector2 playerPos = objTf.position
    Vector2 playerLookDir = objTf.right;
  
    Vector2 playerToTriggerDir = (center - playerPos).normalized;
  
    float lookness = Vector2.Dot(playerLookDir, playerToTriggerDir);
  
    bool isLooking = lookness >= 0.5f;
  
    Gizmos.color = isLooking ? Color.green : Color.red
    Gizmos.DrawLine(playerPos, playerToTriggerDir)
    
    Gizmos.color = Color.yellow
    Gizmos.DrawLine(playerPos, playerPos + playerLookDir)
  }
}

public class SpaceTransform: MonoBehaviour {
  public Vector2 localSpacePoint

  void onDrawGizmos() {

    Vector2 objPos = transform.position;
    Vector2 right = transform.right;
    Vector2 up = transform.up;

    Vector2 LocalToWorld(Vector2 localPoint) {
      Vector2 localWorldOffset = right * localPoint.x + up * localPoint.y;
      return (Vector2)transform.position + localWorldOffset;
    }

    Vector2 wordSpacePoint = LocalToWorld(localSpacePoint);

    DrawBasisVectors(objPos, objRight, objUp);
    DrawBasisVectors(Vector2.zero, Vector2.right, Vector2.up);

    Gizmos.color = Color.blue;
    Gizmos.DrawSphere(wordSpacePoint, .1f);

  }

 

  void DrawBasisVectors( Vector2 pos, Vector2 right, Vector2 up) {
    Gizmos.color = Color.red;
    Gizmos.DrawRay(pos, right);
    Gizmos.color = Color.green;
    Gizmos.DrawRay(pos, up);
    Gizmos.color = Color.blue;
    
  }
}

public class SpaceTransform: MonoBehaviour {
  public Transform localObjTransform;
  public Vector2 worldSpacePoint

  void onDrawGizmos() {

    Vector2 objPos = transform.position;
    Vector2 right = transform.right;
    Vector2 up = transform.up;

    Vector2 LocalToWorld(Vector2 localPoint) {
      Vector2 localWorldOffset = right * localPoint.x + up * localPoint.y;
      return (Vector2)transform.position + localWorldOffset;
    }

    Vector2 WorldToLocal(Vector2 worldPt) {
      Vector2 relPoint = worldPt - objPos

      float x = Vector2.Dot(relPoint, right);
      float y = Vector2.Dot(relPoint, up);

      return new Vector2(x, y);
    }


    DrawBasisVectors(objPos, right, up);
    DrawBasisVectors(Vector2.zero, Vector2.right, Vector2.up);

    Gizmos.color = Color.cyan;
    Gizmos.DrawSphere(wordSpacePoint, .1f);

    localObjTransform.localPosition = WorldToLocal(worldSpacePoint);

  }

 

  void DrawBasisVectors( Vector2 pos, Vector2 right, Vector2 up) {
    Gizmos.color = Color.red;
    Gizmos.DrawRay(pos, right);
    Gizmos.color = Color.green;
    Gizmos.DrawRay(pos, up);
    Gizmos.color = Color.blue;
    
  }
}